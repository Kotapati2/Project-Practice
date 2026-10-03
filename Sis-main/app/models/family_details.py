from datetime import datetime

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.dialects import mssql
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.constants import AADHAAR_LEN, FAMILY_NAME_MAX_LEN, MOBILE_LEN
from app.db.base_class import Base


class FamilyDetails(Base):
    __tablename__ = "family_details"
    __table_args__ = (
        UniqueConstraint(
            "student_id", "relationship_id", "name", name="uq_family_member"
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.student_id", ondelete="CASCADE"), nullable=False
    )

    # No relationship_master table in scope - validated at the API layer
    # against constants.RELATIONSHIP_TYPES.
    relationship_id: Mapped[int] = mapped_column(Integer, nullable=False)

    name: Mapped[str] = mapped_column(String(FAMILY_NAME_MAX_LEN), nullable=False)
    mobile_number: Mapped[str] = mapped_column(
        String(MOBILE_LEN), nullable=False, unique=True
    )

    # No occupation_master table in scope - validated at the API layer
    # against constants.OCCUPATION_TYPES.
    occupation_id: Mapped[int] = mapped_column(Integer, nullable=False)

    aadhaar_number: Mapped[str] = mapped_column(
        String(AADHAAR_LEN), nullable=False, unique=True
    )

    created_at: Mapped[datetime] = mapped_column(
        mssql.DATETIME2, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        mssql.DATETIME2, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    student: Mapped["Student"] = relationship(back_populates="family_members")  # noqa: F821
