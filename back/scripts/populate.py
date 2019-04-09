from typing import List, Union
import os
import csv
import json

from click import Group

from back.models import db
from back.schemas.base import BaseSchema
from back.schemas.category import CategorySchema
from back.schemas.folder import FolderSchema
from back.schemas.note import NoteSchema


# --> DATA FORMAT
DELIMITER = "\t"
DATAPATH = "data"
# --> Categories
CATEGORIES_PATH = "{}/categories.txt".format(DATAPATH)
CATEGORIES_EXPECTED_FIELDS = ["id", "name", "image_url"]
# --> Folders
FOLDERS_PATH = "{}/folders.txt".format(DATAPATH)
FOLDERS_EXPECTED_FIELDS = ["id", "name", "type", "image_url", "category_id"]
# --> Notes
NOTES_PATH = "{}/notes/".format(DATAPATH)

populate = Group("populate")

f_print = lambda *args, **kwargs : print(*args, **kwargs, flush=True) # noqa


def check_file_exists(path: str, error_message: Union[str, None] = None) -> None:
    assert os.access(path, os.F_OK), error_message or "No file found at {}".format(path)


def check_header_data(path: str, expected_fields: List) -> None:
    with open(path, newline="") as csv_data:
        reader = csv.DictReader(csv_data, delimiter=DELIMITER)
        assert all(
            expected in reader.fieldnames for expected in expected_fields
            ), "Missing fields in header of {}. Expecting all of {}. Found {}".format(
                path, expected_fields, reader.fieldnames
            )


def load_model(path: str, schema: BaseSchema) -> None:
    with open(path, newline="") as csv_data:
        reader = csv.DictReader(csv_data, delimiter=DELIMITER)
        counter, error_counter = 0, 0
        session = db.session()
        for row in reader:
            try:
                item, errors = schema().load(row)
                if errors:
                    raise Exception(errors)
                session.add(item)
                session.commit()
                counter += 1
                f_print(".", end="")
            except Exception as e:
                session.rollback()
                f_print("\nFailed with {}".format(e))
                error_counter += 1
        f_print("\nAdded: {}, Failed: {}, Total: {}".format(counter, error_counter, counter + error_counter))


def load_notes():
    notes_files = [file for file in os.listdir(NOTES_PATH) if file.endswith(".json")]
    counter, error_counter = 0, 0
    session = db.session()
    for note_file in notes_files:
        with open("{}/{}".format(NOTES_PATH, note_file)) as f:
            note_data = json.loads(f.read())
        try:
            note, errors = NoteSchema().load(note_data)
            if errors:
                raise Exception(errors)
            session.add(note)
            session.commit()
            counter += 1
            f_print(".", end="")
        except Exception as e:
            session.rollback()
            f_print("\nFailed with {}".format(e))
            error_counter += 1
    f_print("\nAdded: {}, Failed: {}, Total: {}".format(counter, error_counter, counter + error_counter))


def verify_data():
    check_file_exists(CATEGORIES_PATH, "Categories file not found at {}".format(CATEGORIES_PATH))
    check_file_exists(FOLDERS_PATH, "Folders file not found at {}".format(FOLDERS_PATH))

    check_header_data(CATEGORIES_PATH, CATEGORIES_EXPECTED_FIELDS)
    check_header_data(FOLDERS_PATH, FOLDERS_EXPECTED_FIELDS)


@populate.command("fill")
def fill():
    f_print("*" * 25)
    f_print("Verifying data")
    verify_data()
    f_print("*" * 25)
    f_print("Loading data")
    f_print("--> Categories")
    load_model(CATEGORIES_PATH, CategorySchema)
    f_print("--> Folders")
    load_model(FOLDERS_PATH, FolderSchema)
    f_print("--> Notes")
    load_notes()
