from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class NationalityMaster(Base):
    __tablename__ = "nationality_master"

    nationality_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    nationality_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )