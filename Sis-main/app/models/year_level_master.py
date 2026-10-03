from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class YearLevelMaster(Base):
    __tablename__ = "year_level_master"

    year_level_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    year_level_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )