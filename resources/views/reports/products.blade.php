<style>
    body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
    h1 { text-align: center; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #000; padding: 6px; text-align: left; }
    th { background-color: #eee; }
    img {width: 100px;}
 </style>
 <img src="storage/images/logos/elprogresomuebles_logo.jpg" class="jpg" alt="Logo">
 <h3>{{$data["title"]}}</h3>
 <h4>{{$data["date"]}}</h4>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
        </tr>
    </thead>
    <tbody>
    @foreach ($data["products"] as $p)
    <tr>
        <td>{{ $p->id }}</td>
        <td>{{ $p->name }}</td>
        <td>{{ $p->description }}</td>
        <td>${{ $p->price }}</td>
        <td>{{ $p->stock }}</td>
    </tr>
    @endforeach
    </tbody>
 </table>