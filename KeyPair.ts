import crypto from 'crypto';

export default class KeyPair {
  private _public: string;
  private _private: string;
  constructor(publicKey: string, privateKey: string){
    this._public = publicKey;
    this._private = privateKey;
  }
  get public(): string { return this._public; }
  get private(): string { return this._private; }
  encryptPublic(data: string){
    return crypto.publicEncrypt(this.public, Buffer.from(data)).toString('hex');
  }
  static generate(){
    const { publicKey, privateKey } = crypto.generateKeyPairSync(<"x448">'rsa', {
      modulusLength: 2048,
      namedCurve: 'secp256k1', 
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },     
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: '1234',
      } 
    });
    return new KeyPair(<string><any>publicKey, <string><any>privateKey);
  }
}