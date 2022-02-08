
use bench;
set foreign_key_checks = 0;
  truncate table status;
  truncate table user;
  truncate table role;
  truncate table resource;
  truncate table user_role;

insert into role(role,description)
VALUES
("AD","admin"),
("AM","account-manager"),
("RM","resource-manager"),
("HR","human-manager"),
("L","leader");


insert into status(statuscode, status)
values
  ('V', 'Available'),
  ('N', 'Nonbillable'),
  ('A','Allocated'),
  ('B','Blocked'),
  ('L','Leave'),
  ('R','Resign');


INSERT INTO `bench`.`user`
(`userid`,
`email`,
`username`,
`passwordhash`,
`mobile`)
VALUES
("ebc20bbe-b953-4970-b0e6-5de67f5f520d","daxon@gmail.com","daxon","$2b$10$EP15VskPZjVfpWr2NtYCyO6h2ko6uISHViX0U8Dt324JVYxLSrHo6","12345" ),
("daca1e72-44cf-47db-94d7-9e33f9d254f0","malolan@gmail.com","malolan","$2b$10$4Wdfx34Ib9M5JpZ0buUQa.xgF9hazHETLck4Xjea6WOpM.zqAfihi","12325"),
("61c6de7a-1104-4bcb-bb83-794d74b96bd5","shirdhi@gmail.com","shirdhi","$2b$10$HhcoyBdueVVsnoQaj6kuBuubVzqkJAU4l8nnskrBS7xk3eeoGgH56","12315"),
("3b4d058d-7544-45ba-8d16-377e2ac11ccc","vsrao@gmail.com", "VS.Rao","$2b$10$BT4.DegHTkyQ.Ucgxl0o7.FF5Qo3VczZLGqwbh1FMU.xMnqq.u6bG","12355"),
("e6990dec-921e-47ba-9227-f94e77c8e2ab","admin@gmail.com","Admin","$2b$10$2sV0U/LCBk83bQBuA9iJm.fhVrY8B8eR6/jnY.yHL9NJMX5RtrRve","12385"),
("8d7d9e9c-1393-47a9-aae7-a7b092817a8c","bharani@gmail.com","Bharani","$2b$10$QcOCXi38BnUqMguSlLipTORFHq5PO2MoJwMuN5kzwbpin52GntwhO","22385"),
("11c199c7-b20c-4c0b-a3b3-629a5732488f","ramakrishna@gmail.com", "RamaKrishna","$2b$10$X4aCpFLZEe.aCkNmgP2jOuX3T7hQ8FuqnRL2Zx4GV3Ai6RCYYzPni","32385");


INSERT INTO `bench`.`user_role`
(`userid`,
`roleid`)
VALUES
("ebc20bbe-b953-4970-b0e6-5de67f5f520d",2),
("daca1e72-44cf-47db-94d7-9e33f9d254f0", 2),
("61c6de7a-1104-4bcb-bb83-794d74b96bd5", 2),
("3b4d058d-7544-45ba-8d16-377e2ac11ccc",3),
("e6990dec-921e-47ba-9227-f94e77c8e2ab",1),
("8d7d9e9c-1393-47a9-aae7-a7b092817a8c",2),
("11c199c7-b20c-4c0b-a3b3-629a5732488f", 2);