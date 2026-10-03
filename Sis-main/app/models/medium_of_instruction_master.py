from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class MediumOfInstructionMaster(Base):
    __tablename__ = "medium_of_instruction_master"

    medium_of_instruction_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    medium_of_instruction_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )