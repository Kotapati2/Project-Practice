from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class CasteMaster(Base):
    __tablename__ = "caste_master"

    caste_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    caste_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )

    sub_castes: Mapped[list["SubCasteMaster"]] = relationship(
        "SubCasteMaster",
        back_populates="caste",
    )