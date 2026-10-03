from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class SkillTypeMaster(Base):
    __tablename__ = "skill_type_master"

    skill_type_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    skill_type_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )