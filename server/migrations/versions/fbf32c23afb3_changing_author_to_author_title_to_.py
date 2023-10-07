"""changing Author to author Title to title Image to image

Revision ID: fbf32c23afb3
Revises: 072242487887
Create Date: 2023-10-07 14:36:14.070938

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbf32c23afb3'
down_revision = '072242487887'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('title', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('image', sa.String(), nullable=True))
        batch_op.drop_column('Author')
        batch_op.drop_column('Title')
        batch_op.drop_column('Image')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.add_column(sa.Column('Image', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('Title', sa.VARCHAR(), nullable=False))
        batch_op.add_column(sa.Column('Author', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('image')
        batch_op.drop_column('title')
        batch_op.drop_column('author')

    # ### end Alembic commands ###