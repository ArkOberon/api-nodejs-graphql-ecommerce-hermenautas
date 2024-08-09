import base64url from 'base64url';

/**
 * @description Función de desencriptado para poder generar
 *  la firma que solicitada por Backend Hermenautas.
 */

export const decodeParameters = (data) => {
  let dsDataDecrypt = JSON.parse(base64url.decode(data, 'utf8'));
  return dsDataDecrypt;
};
