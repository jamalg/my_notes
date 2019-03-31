from marshmallow import fields
from marshmallow.utils import missing as missing_


def _custom_validate_missing(self, value):
    """Makes required empty string, lists, dict behave like None if they are required
    """
    if value is missing_:
        if hasattr(self, 'required') and self.required:
            self.fail('required')
    if not value:
        if hasattr(self, 'allow_none') and self.allow_none is not True:
            self.fail('null')


fields.Field._validate_missing = _custom_validate_missing
