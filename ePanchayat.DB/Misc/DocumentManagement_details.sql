CREATE TABLE documents (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255),
  file_type VARCHAR(50),           -- e.g., pdf, jpg, png
  file_path TEXT,                  -- server or cloud storage path
  linked_module VARCHAR(50),       -- e.g., scheme, complaint, member
  linked_id INT,                   -- e.g., scheme_id or member_id
  uploaded_by INT,                 -- user_id of uploader
  upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  remarks TEXT
);


INSERT INTO documents (
  file_name, file_type, file_path,
  linked_module, linked_id, uploaded_by, remarks
)
VALUES (
  'beneficiary_form.pdf', 'pdf',
  '/uploads/schemes/beneficiary_form_101.pdf',
  'scheme', 101, 5, 'Initial application form'
);

INSERT INTO documents (
  file_name, file_type, file_path,
  linked_module, linked_id, uploaded_by, remarks
)
VALUES (
  'beneficiary_form.pdf', 'pdf',
  '/uploads/schemes/beneficiary_form_101.pdf',
  'scheme', 102, 6, 'Final application form'
);

