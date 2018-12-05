insert into orders (client_id, total, date)
values ($1, $2, current_date)
returning *;