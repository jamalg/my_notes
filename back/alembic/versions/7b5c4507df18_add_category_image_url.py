"""Add Category.image_url

Revision ID: 7b5c4507df18
Revises: f2f4144625f5
Create Date: 2019-04-09 13:52:13.934162

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b5c4507df18'
down_revision = 'f2f4144625f5'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('categories', sa.Column('image_url', sa.String(length=512), nullable=True))


def downgrade():
    op.drop_column('categories', 'image_url')
