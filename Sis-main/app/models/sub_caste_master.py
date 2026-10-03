from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class SubCasteMaster(Base):
    __tablename__ = "sub_caste_master"

    sub_caste_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    sub_caste_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    caste_id: Mapped[int] = mapped_column(
        ForeignKey("caste_master.caste_id"),
        nullable=False,
    )

    caste: Mapped["CasteMaster"] = relationship(
        "CasteMaster",
        back_populates="sub_castes",
    )