from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class IncomeMaster(Base):
    __tablename__ = "income_master"

    income_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    income_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )