"""Init db

Revision ID: f2f4144625f5
Revises:
Create Date: 2019-03-30 17:07:16.103459

"""
from alembic import op
import sqlalchemy as sa
from back.utils.sqlalchemy import types

# revision identifiers, used by Alembic.
revision = 'f2f4144625f5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('categories',
    sa.Column('created_at', types.UTCDateTime(timezone=True), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('updated_at', types.UTCDateTime(timezone=True), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_categories'))
    )
    op.create_table('folders',
    sa.Column('created_at', types.UTCDateTime(timezone=True), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('updated_at', types.UTCDateTime(timezone=True), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('type', sa.Enum('Book', 'Documentation', 'Other', name='foldertype'), nullable=False),
    sa.Column('image_url', sa.String(length=512), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name=op.f('fk_folders_category_id_categories')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_folders'))
    )
    op.create_table('notes',
    sa.Column('created_at', types.UTCDateTime(timezone=True), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('updated_at', types.UTCDateTime(timezone=True), server_default=sa.text("TIMEZONE('utc', CURRENT_TIMESTAMP)"), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False),
    sa.Column('tags', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('body', sa.Text(), nullable=True),
    sa.Column('folder_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['folder_id'], ['folders.id'], name=op.f('fk_notes_folder_id_folders')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_notes'))
    )


def downgrade():
    op.drop_table('notes')
    op.drop_table('folders')
    op.drop_table('categories')
    op.execute("DROP TYPE foldertype;")
