from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class MotherTongueMaster(Base):
    __tablename__ = "mother_tongue_master"

    mother_tongue_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    mother_tongue_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )