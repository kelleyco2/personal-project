select c.id as cart_item_id, p.id as product_id, p.title, p.img, p.price, c.quantity
from cart c
join products p on c.product_id = p.id
where c.client_id = $1
order by p.id;