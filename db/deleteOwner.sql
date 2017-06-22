update vehicles
set owner_id = null
where id = $2
RETURNING *;
