import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const CoffeeCard = ({ coffee, setCoffees, coffees }) => {

    const { _id, name, quantity, supplier, taste, photo } = coffee;


    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            //Delete Coffee
            fetch(`http://localhost:5000/coffee/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (data.deletedCount > 0) {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            )
                        }
                    }
                    const remaining = coffees.filter(coff => coff._id !== _id);
                    setCoffees(remaining);
                })
        })



    }

    return (
        <div className="card bg-[#F5F4F1] card-side shadow-xl">
            <figure><img src={photo} alt="Movie" /></figure>
            <div className="flex justify-between w-full pl-8 pr-4 pt-2">
                <div>
                    <h2 className="">Name : {name}</h2>
                    <p>{quantity}</p>
                    <p>{supplier}</p>
                    <p>{taste}</p>
                </div>
                <div className="btn-group btn-group-vertical space-y-4">
                    <button className="btn btn-active">View</button>
                    <Link to={`/updateCoffee/${_id}`}>
                        <button className="btn">Edit</button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn">X</button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;