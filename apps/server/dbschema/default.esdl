using extension auth;

module default {
  type User {
    required email: str {   
      constraint exclusive;                              
      constraint regexp(r'^[^@]+@[^@]+\.[^@]+$');
    }        
    name: str;
    multi credentials: Credential;

    index on (.email);
  }

  type Credential {
    required publicKey: str;
    required counter: int64;
    required createdAt: datetime;
    user: User;
  }
}