from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables / .env file.
    Never hardcode credentials anywhere else in the codebase.
    """

    DB_HOST: str
    DB_PORT: int = 1433
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_DRIVER: str = "ODBC Driver 18 for SQL Server"
    DB_TRUST_SERVER_CERTIFICATE: str = "yes"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def DATABASE_URL(self) -> str:
        user = quote_plus(self.DB_USER)
        password = quote_plus(self.DB_PASSWORD)
        driver = quote_plus(self.DB_DRIVER)
        return (
            f"mssql+pyodbc://{user}:{password}@{self.DB_HOST}:{self.DB_PORT}"
            f"/{self.DB_NAME}?driver={driver}"
            f"&TrustServerCertificate={self.DB_TRUST_SERVER_CERTIFICATE}"
        )


settings = Settings()
