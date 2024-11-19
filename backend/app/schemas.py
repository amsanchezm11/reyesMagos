# schemas.py
from pydantic import BaseModel
from typing import List, Optional


class UsuarioBase(BaseModel):
    nombre: str
    edad: int


class UsuarioCreate(UsuarioBase):
    pass


class Usuario(UsuarioBase):
    id: int

    class Config:
        orm_mode = True


class ReyMagoBase(BaseModel):
    nombre: str


class ReyMagoCreate(ReyMagoBase):
    pass


class ReyMago(ReyMagoBase):
    id: int

    class Config:
        orm_mode = True


class JugueteBase(BaseModel):
    nombre: str
    imagen: str


class JugueteCreate(JugueteBase):
    pass


class Juguete(JugueteBase):
    id: int

    class Config:
        orm_mode = True


class CartaBase(BaseModel):
    id: int
    usuario_id: int
    rey_mago_id: int
    juguetes_ids: List[int]

    class Config:
        orm_mode = True


class CartaCreate(BaseModel):
    usuario_id: int
    rey_mago_id: int
    juguetes_ids: List[int]

    class Config:
        orm_mode = True


class Carta(CartaBase):
    id: int

    class Config:
        orm_mode = True
