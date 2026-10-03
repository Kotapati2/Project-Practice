from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class StateMaster(Base):
    __tablename__ = "state_master"

    state_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    state_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )