select o.id, p.title, op.quantity, c.name, o.total, o.status
from orders o
join orderProducts op on o.id = op.order_id
join clients c on c.id = o.client_id
join products p on p.id = op.product_id;