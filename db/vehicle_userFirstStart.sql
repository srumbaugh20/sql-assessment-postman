select * from users
join vehicles on vehicles.owner_id = users.id
where users.name like $1 || '%'
