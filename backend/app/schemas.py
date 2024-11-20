# app/schemas.py

from pydantic import BaseModel
from typing import Optional

class UsuarioBase(BaseModel):
    nombre: str
    email: str
    reyMago: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioRead(UsuarioBase):
    id: int

    class Config:
        orm_mode = True

class TipoJugueteBase(BaseModel):
    nombre: str

class TipoJugueteCreate(TipoJugueteBase):
    pass

class TipoJugueteRead(TipoJugueteBase):
    id: int

    class Config:
        orm_mode = True

class JugueteBase(BaseModel):
    nombre: str
    imagen: Optional[str] = None
    tipo_id: int

class JugueteCreate(JugueteBase):
    pass

class JugueteRead(JugueteBase):
    id: int

    class Config:
        orm_mode = True

class CartaBase(BaseModel):
    usuario_id: int
    juguete_id: int

class CartaCreate(CartaBase):
    pass

class CartaRead(CartaBase):
    id: int

    class Config:
        orm_mode = True

# Esquema para los datos de login
class LoginRequest(BaseModel):
    email: str
    password: str

# Esquema para la respuesta con el token JWT
class LoginResponse(BaseModel):
    access_token: str
    token_type: str