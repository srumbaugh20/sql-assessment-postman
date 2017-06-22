select * from users
join vehicles on vehicles.owner_id = users.id
where users.email = $1
