function updateOrder(ids) {
    fetch('/admin/update_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ids)
    }).then(res => res.json()).then(data => alert(data.message));
}
