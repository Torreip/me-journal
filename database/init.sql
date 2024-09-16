create type privilegesLevel as ENUM('admin', 'user');

CREATE TABLE IF NOT EXISTS users (
  id INT GENERATED ALWAYS AS IDENTITY,
  username varchar(255) NOT NULL UNIQUE,
  "accessKey" varchar(255) NOT NULL, -- SHA256 of the password (Generated and sent by client), Rehashed with salt on the server to avoid rainbow tables and hash attacks
  "usesPasskey" BOOLEAN DEFAULT FALSE, -- If no HTTPS is available or the user doesn't want to use passkeys
  privileges privilegesLevel DEFAULT 'user',
  PRIMARY KEY (id)
);

-- The hash provided by the client is Different from the key used to encrypt/decrypt the content by the client allowing for minimal knowledge by the server

CREATE TABLE IF NOT EXISTS notes (
  id INT GENERATED ALWAYS AS IDENTITY,
  "ownerId" INT NOT NULL,
  content TEXT NOT NULL, -- Encrypted content
  "noteIV" VARCHAR(255) NOT NULL, -- Initialization Vector for the encryption
  "atachedFiles" INT[], -- Array of file ids so one can be easily deleted (Getting being a non-issue)
  "contentChecksum" VARCHAR(255) NOT NULL, -- Calculated by the Client on the encrypted content Checked by the server
  "editTimestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last time the note was edited avoid concurrency issues
  "creationTimestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT "ownerId" FOREIGN KEY ("ownerId") REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS files (
  id INT GENERATED ALWAYS AS IDENTITY,
  "ownerId" INT NOT NULL,
  "noteId" INT NOT NULL,
  "filePath" VARCHAR(255) NOT NULL, -- Path to the file canonical name should be DesiredFileName-NoteId-FileId to ensure uniqueness
  "fileName" VARCHAR(255) NOT NULL, -- Original file name (Might be encrypted not sure yet)
  "fileChecksum" VARCHAR(255) NOT NULL, -- Calculated by the Client on the encrypted content
  "fileSize" INT NOT NULL, -- Blob size in bytes
  "uploadTimestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT "ownerId" FOREIGN KEY ("ownerId") REFERENCES users(id),
  CONSTRAINT "noteId" FOREIGN KEY ("noteId") REFERENCES notes(id)
);