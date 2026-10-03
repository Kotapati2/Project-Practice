from datetime import datetime

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.dialects import mssql
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.constants import (
    BANK_ACCOUNT_HOLDER_NAME_MAX_LEN,
    BANK_ACCOUNT_NUMBER_MAX_LEN,
    PAN_LEN,
)
from app.db.base_class import Base


class BankDetails(Base):
    __tablename__ = "bank_details"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.student_id", ondelete="CASCADE"), nullable=False
    )

    account_holder_name: Mapped[str] = mapped_column(
        String(BANK_ACCOUNT_HOLDER_NAME_MAX_LEN), nullable=False
    )
    account_number: Mapped[str] = mapped_column(
        String(BANK_ACCOUNT_NUMBER_MAX_LEN), nullable=False, unique=True
    )

    # TODO: Branch Table should be created and branch_id should be a foreign key to that table
    branch_id: Mapped[int] = mapped_column(Integer, nullable=False)

    account_holder_pan_number: Mapped[str | None] = mapped_column(
        String(PAN_LEN), nullable=True, unique=True
    )
    
    created_at: Mapped[datetime] = mapped_column(
        mssql.DATETIME2, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        mssql.DATETIME2, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    student: Mapped["Student"] = relationship(back_populates="bank_accounts")  # noqa: F821
