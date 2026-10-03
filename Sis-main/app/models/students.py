from datetime import date, datetime

from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.dialects import mssql
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.constants import (
    ADMISSION_NUMBER_MAX_LEN,
    ADDRESS_MAX_LEN,
    AADHAAR_LEN,
    DISABILITIES_DETAILS_MAX_LEN,
    DISABILITIES_MAX_LEN,
    EMAIL_MAX_LEN,
    FATHER_NAME_MAX_LEN,
    FIRST_NAME_MAX_LEN,
    FULL_NAME_MAX_LEN,
    IDENTITY_MARK_MAX_LEN,
    INCOME_CERT_NUMBER_MAX_LEN,
    MOBILE_LEN,
    PHOTO_MAX_LEN,
    SUR_NAME_MAX_LEN,
)
from app.db.base_class import Base


class Student(Base):
    __tablename__ = "students"

    student_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )

    # --- Basic details -----------------------------------------------
    photo: Mapped[str] = mapped_column(String(PHOTO_MAX_LEN), nullable=False)
    full_name: Mapped[str] = mapped_column(String(FULL_NAME_MAX_LEN), nullable=False)
    first_name: Mapped[str] = mapped_column(String(FIRST_NAME_MAX_LEN), nullable=False)
    sur_name: Mapped[str] = mapped_column(String(SUR_NAME_MAX_LEN), nullable=False)
    father_name: Mapped[str] = mapped_column(String(FATHER_NAME_MAX_LEN), nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)

    aadhaar_number: Mapped[str] = mapped_column(
        String(AADHAAR_LEN), nullable=False, unique=True
    )
    mobile_number: Mapped[str] = mapped_column(String(MOBILE_LEN), nullable=False)
    alternate_mobile_number: Mapped[str | None] = mapped_column(
        String(MOBILE_LEN), nullable=True
    )
    email: Mapped[str] = mapped_column(String(EMAIL_MAX_LEN), nullable=False)

    present_address: Mapped[str] = mapped_column(String(ADDRESS_MAX_LEN), nullable=False)
    permanent_address: Mapped[str] = mapped_column(String(ADDRESS_MAX_LEN), nullable=False)

    # --- Real FKs (targets are in-scope) -------------------------------
    gender_id: Mapped[int] = mapped_column(
        ForeignKey("gender_master.gender_id"), nullable=False
    )
    blood_group_id: Mapped[int] = mapped_column(
        ForeignKey("blood_group_master.blood_group_id"), nullable=False
    )

    # --- Plain columns: conceptual FKs to master tables NOT in scope ---
    # TODO: sub_caste table should be created and sub_caste_id should be a foreign key to that table
    sub_caste_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: religion_master table should be created and religion_id should be a foreign key to that table
    religion_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: caste_master table should be created and caste_id should be a foreign key to that table
    nationality_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: mother_tongue_master table should be created and mother_tongue_id should be a foreign key to that table
    mother_tongue_id: Mapped[int] = mapped_column(Integer, nullable=False)

    identity_mark_1: Mapped[str] = mapped_column(
        String(IDENTITY_MARK_MAX_LEN), nullable=False
    )
    identity_mark_2: Mapped[str] = mapped_column(
        String(IDENTITY_MARK_MAX_LEN), nullable=False
    )

    disabilities: Mapped[str] = mapped_column(String(DISABILITIES_MAX_LEN), nullable=False)
    disabilities_details: Mapped[str | None] = mapped_column(
        String(DISABILITIES_DETAILS_MAX_LEN), nullable=True
    )

    admission_number: Mapped[str] = mapped_column(
        String(ADMISSION_NUMBER_MAX_LEN), nullable=False, unique=True
    )
    admission_date: Mapped[date] = mapped_column(Date, nullable=False)

    # TODO: school_institution_master table should be created and school_institution_id should be a foreign key to that table
    school_institution_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: medium_of_instruction_master table should be created and medium_of_instruction_id should be a foreign key to that table
    medium_of_instruction_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: course_master table should be created and course_id should be a foreign key to that table
    course_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: course_type_master table should be created and course_type_id should be a foreign key to that table
    income_id: Mapped[int] = mapped_column(Integer, nullable=False)
    income_certificate_number: Mapped[str | None] = mapped_column(
        String(INCOME_CERT_NUMBER_MAX_LEN), nullable=True
    )

    # TODO: state_master table should be created and state_id should be a foreign key to that table
    state_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: district_master table should be created and district_id should be a foreign key to that table
    district_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: sub_division_master table should be created and sub_division_id should be a foreign key to that table
    sub_division_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: mandal_taluka_master table should be created and mandal_taluka_id should be a foreign key to that table
    mandal_taluka_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # TODO: village_city_town_master table should be created and village_city_town_id should be a foreign key to that table
    village_city_town_id: Mapped[int] = mapped_column(Integer, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        mssql.DATETIME2, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        mssql.DATETIME2, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    # --- Relationships to in-scope children ----------------------------
    family_members: Mapped[list["FamilyDetails"]] = relationship(  # noqa: F821
        back_populates="student", cascade="all, delete-orphan"
    )
    bank_accounts: Mapped[list["BankDetails"]] = relationship(  # noqa: F821
        back_populates="student", cascade="all, delete-orphan"
    )
