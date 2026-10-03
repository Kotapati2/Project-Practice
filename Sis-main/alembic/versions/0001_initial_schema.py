"""initial schema: gender_master, blood_group_master, students, family_details, bank_details

Revision ID: 0001
Revises:
Create Date: 2026-08-16

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mssql
from sqlalchemy.sql import column, table

from app.core.constants import (
    AADHAAR_LEN,
    ADDRESS_MAX_LEN,
    ADMISSION_NUMBER_MAX_LEN,
    BANK_ACCOUNT_HOLDER_NAME_MAX_LEN,
    BANK_ACCOUNT_NUMBER_MAX_LEN,
    BLOOD_GROUP_NAME_MAX_LEN,
    BLOOD_GROUP_OPTIONS,
    DISABILITIES_DETAILS_MAX_LEN,
    DISABILITIES_MAX_LEN,
    EMAIL_MAX_LEN,
    FAMILY_NAME_MAX_LEN,
    FATHER_NAME_MAX_LEN,
    FIRST_NAME_MAX_LEN,
    FULL_NAME_MAX_LEN,
    GENDER_NAME_MAX_LEN,
    GENDER_OPTIONS,
    IDENTITY_MARK_MAX_LEN,
    INCOME_CERT_NUMBER_MAX_LEN,
    MOBILE_LEN,
    PAN_LEN,
    PHOTO_MAX_LEN,
    SUR_NAME_MAX_LEN,
)

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ------------------------------------------------------------------
    # 1. gender_master (parent, no FKs, manually assigned PK)
    # ------------------------------------------------------------------
    op.create_table(
        "gender_master",
        sa.Column("gender_id", sa.Integer(), nullable=False, autoincrement=False),
        sa.Column("gender_name", sa.String(GENDER_NAME_MAX_LEN), nullable=False),
        sa.PrimaryKeyConstraint("gender_id", name="pk_gender_master"),
        sa.UniqueConstraint("gender_name", name="uq_gender_master_gender_name"),
    )

    gender_master_table = table(
        "gender_master",
        column("gender_id", sa.Integer),
        column("gender_name", sa.String),
    )
    op.bulk_insert(
        gender_master_table,
        [{"gender_id": gid, "gender_name": name} for gid, name in GENDER_OPTIONS],
    )

    # ------------------------------------------------------------------
    # 2. blood_group_master (parent, no FKs, manually assigned PK)
    # ------------------------------------------------------------------
    op.create_table(
        "blood_group_master",
        sa.Column("blood_group_id", sa.Integer(), nullable=False, autoincrement=False),
        sa.Column("blood_group_name", sa.String(BLOOD_GROUP_NAME_MAX_LEN), nullable=False),
        sa.PrimaryKeyConstraint("blood_group_id", name="pk_blood_group_master"),
        sa.UniqueConstraint(
            "blood_group_name", name="uq_blood_group_master_blood_group_name"
        ),
    )

    blood_group_master_table = table(
        "blood_group_master",
        column("blood_group_id", sa.Integer),
        column("blood_group_name", sa.String),
    )
    op.bulk_insert(
        blood_group_master_table,
        [
            {"blood_group_id": bid, "blood_group_name": name}
            for bid, name in BLOOD_GROUP_OPTIONS
        ],
    )

    # ------------------------------------------------------------------
    # 3. students (child of gender_master, blood_group_master)
    # ------------------------------------------------------------------
    op.create_table(
        "students",
        sa.Column("student_id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("photo", sa.String(PHOTO_MAX_LEN), nullable=False),
        sa.Column("full_name", sa.String(FULL_NAME_MAX_LEN), nullable=False),
        sa.Column("first_name", sa.String(FIRST_NAME_MAX_LEN), nullable=False),
        sa.Column("sur_name", sa.String(SUR_NAME_MAX_LEN), nullable=False),
        sa.Column("father_name", sa.String(FATHER_NAME_MAX_LEN), nullable=False),
        sa.Column("date_of_birth", sa.Date(), nullable=False),
        sa.Column("aadhaar_number", sa.String(AADHAAR_LEN), nullable=False),
        sa.Column("mobile_number", sa.String(MOBILE_LEN), nullable=False),
        sa.Column("alternate_mobile_number", sa.String(MOBILE_LEN), nullable=True),
        sa.Column("email", sa.String(EMAIL_MAX_LEN), nullable=False),
        sa.Column("present_address", sa.String(ADDRESS_MAX_LEN), nullable=False),
        sa.Column("permanent_address", sa.String(ADDRESS_MAX_LEN), nullable=False),
        sa.Column("gender_id", sa.Integer(), nullable=False),
        sa.Column("blood_group_id", sa.Integer(), nullable=False),
        # Plain columns - conceptual FKs to master tables NOT in this scope.
        sa.Column("sub_caste_id", sa.Integer(), nullable=False),
        sa.Column("religion_id", sa.Integer(), nullable=False),
        sa.Column("nationality_id", sa.Integer(), nullable=False),
        sa.Column("mother_tongue_id", sa.Integer(), nullable=False),
        sa.Column("identity_mark_1", sa.String(IDENTITY_MARK_MAX_LEN), nullable=False),
        sa.Column("identity_mark_2", sa.String(IDENTITY_MARK_MAX_LEN), nullable=False),
        sa.Column("disabilities", sa.String(DISABILITIES_MAX_LEN), nullable=False),
        sa.Column(
            "disabilities_details", sa.String(DISABILITIES_DETAILS_MAX_LEN), nullable=True
        ),
        sa.Column("admission_number", sa.String(ADMISSION_NUMBER_MAX_LEN), nullable=False),
        sa.Column("admission_date", sa.Date(), nullable=False),
        sa.Column("school_institution_id", sa.Integer(), nullable=False),
        sa.Column("medium_of_instruction_id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.Integer(), nullable=False),
        sa.Column("income_id", sa.Integer(), nullable=False),
        sa.Column(
            "income_certificate_number",
            sa.String(INCOME_CERT_NUMBER_MAX_LEN),
            nullable=True,
        ),
        sa.Column("state_id", sa.Integer(), nullable=False),
        sa.Column("district_id", sa.Integer(), nullable=False),
        sa.Column("sub_division_id", sa.Integer(), nullable=False),
        sa.Column("mandal_taluka_id", sa.Integer(), nullable=False),
        sa.Column("village_city_town_id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            mssql.DATETIME2(),
            server_default=sa.text("(sysutcdatetime())"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            mssql.DATETIME2(),
            server_default=sa.text("(sysutcdatetime())"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("student_id", name="pk_students"),
        sa.ForeignKeyConstraint(
            ["gender_id"], ["gender_master.gender_id"], name="fk_students_gender_id"
        ),
        sa.ForeignKeyConstraint(
            ["blood_group_id"],
            ["blood_group_master.blood_group_id"],
            name="fk_students_blood_group_id",
        ),
        sa.UniqueConstraint("aadhaar_number", name="uq_students_aadhaar_number"),
        sa.UniqueConstraint("admission_number", name="uq_students_admission_number"),
    )

    # ------------------------------------------------------------------
    # 4. family_details (child of students)
    # ------------------------------------------------------------------
    op.create_table(
        "family_details",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("relationship_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(FAMILY_NAME_MAX_LEN), nullable=False),
        sa.Column("mobile_number", sa.String(MOBILE_LEN), nullable=False),
        sa.Column("occupation_id", sa.Integer(), nullable=False),
        sa.Column("aadhaar_number", sa.String(AADHAAR_LEN), nullable=False),
        sa.Column(
            "created_at",
            mssql.DATETIME2(),
            server_default=sa.text("(sysutcdatetime())"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            mssql.DATETIME2(),
            server_default=sa.text("(sysutcdatetime())"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id", name="pk_family_details"),
        sa.ForeignKeyConstraint(
            ["student_id"],
            ["students.student_id"],
            name="fk_family_details_student_id",
            ondelete="CASCADE",
        ),
        sa.UniqueConstraint("mobile_number", name="uq_family_details_mobile_number"),
        sa.UniqueConstraint("aadhaar_number", name="uq_family_details_aadhaar_number"),
        sa.UniqueConstraint(
            "student_id", "relationship_id", "name", name="uq_family_member"
        ),
    )

    # ------------------------------------------------------------------
    # 5. bank_details (child of students)
    # ------------------------------------------------------------------
    op.create_table(
        "bank_details",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column(
            "account_holder_name", sa.String(BANK_ACCOUNT_HOLDER_NAME_MAX_LEN), nullable=False
        ),
        sa.Column("account_number", sa.String(BANK_ACCOUNT_NUMBER_MAX_LEN), nullable=False),
        sa.Column("branch_id", sa.Integer(), nullable=False),
        sa.Column("account_holder_pan_number", sa.String(PAN_LEN), nullable=True),
        sa.Column(
            "created_at",
            mssql.DATETIME2(),
            server_default=sa.text("(sysutcdatetime())"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            mssql.DATETIME2(),
            server_default=sa.text("(sysutcdatetime())"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id", name="pk_bank_details"),
        sa.ForeignKeyConstraint(
            ["student_id"],
            ["students.student_id"],
            name="fk_bank_details_student_id",
            ondelete="CASCADE",
        ),
        sa.UniqueConstraint("account_number", name="uq_bank_details_account_number"),
        sa.UniqueConstraint(
            "account_holder_pan_number", name="uq_bank_details_pan_number"
        ),
    )


def downgrade() -> None:
    # Drop children before parents.
    op.drop_table("bank_details")
    op.drop_table("family_details")
    op.drop_table("students")
    op.drop_table("blood_group_master")
    op.drop_table("gender_master")
