from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from app.core.config import settings

# app.db.base imports Base AND every model module, so Base.metadata is
# fully populated before Alembic inspects it. Importing anything else
# here (e.g. just app.db.base_class) would make autogenerate produce
# empty migrations.
from app.db.base import Base

config = context.config

# Override the (blank) sqlalchemy.url from alembic.ini with the value
# read from .env via pydantic-settings - never hardcode it here either.
# NOTE: alembic.ini is parsed by configparser, which treats "%" as the
# start of interpolation syntax (e.g. "%(name)s"). URL-encoded passwords
# (e.g. "$" -> "%24") contain literal "%" characters, so they must be
# escaped as "%%" before being handed to set_main_option, or configparser
# raises "invalid interpolation syntax". get_main_option() below un-escapes
# it back to a single "%" automatically.
config.set_main_option(
    "sqlalchemy.url", settings.DATABASE_URL.replace("%", "%%")
)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
