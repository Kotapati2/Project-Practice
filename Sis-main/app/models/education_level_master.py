from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class EducationLevelMaster(Base):
    __tablename__ = "education_level_master"

    education_level_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    education_level_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )