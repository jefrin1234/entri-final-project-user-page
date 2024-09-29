import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import Spinner from './LoadingComponent';
import toast from 'react-hot-toast';

function ShippingAddress() {
  const [loading, setLoading] = useState(true);
  const [allAddress, setAllAddress] = useState([]);
  const [error, setError] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    default: false,
  });

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get('/address/user-address');
      setAllAddress(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmitAddress = async (e) => {
    e.preventDefault();

    try {
      if (selectedAddress) {
        const response = await axiosInstance.patch('/address/update-address', {
          addressId: selectedAddress._id,
          ...newAddress,
        });
        toast.success('Address updated');
      } else {
        const response = await axiosInstance.post('/address/add-address', newAddress);
        toast.success('New address added');
      }
      fetchAddresses();
      setShowFormModal(false);
    } catch (error) {
      toast.error('Error submitting address');
    }
  };

  const handleDeleteAddress = async () => {
    try {
      await axiosInstance.delete('/address/delete-address', {
        data: { addressId: selectedAddress._id },
      });
      fetchAddresses();
      setShowDeleteModal(false);
      toast.success('Address deleted');
    } catch (error) {
      toast.error('Error deleting address');
    }
  };

  const openNewAddressForm = () => {
    setSelectedAddress(null);
    setNewAddress({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      default: false,
    });
    setShowFormModal(true);
  };

  const openEditAddressForm = (address) => {
    setSelectedAddress(address);
    setNewAddress({ ...address });
    setShowFormModal(true);
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4 max-w-xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Addresses</h2>

      {allAddress.length > 0 ? (
        <div className="space-y-6">
          {allAddress.map((address) => (
            <div
              key={address._id}
              className="border dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-black transition-all"
            >
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{address.fullName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{address.phoneNumber}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{address.emailAddress}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {address.streetAddress}, {address.city}, {address.state} - {address.postalCode}
              </p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => openEditAddressForm(address)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowDeleteModal(true);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No addresses found.</p>
      )}

      <button
        onClick={openNewAddressForm}
        className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
      >
        Add New Address
      </button>

      {showFormModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {selectedAddress ? 'Edit Address' : 'Add Address'}
            </h3>
            <form onSubmit={handleSubmitAddress}>
              {['fullName', 'phoneNumber', 'emailAddress', 'streetAddress', 'city', 'state', 'postalCode'].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                    value={newAddress[field]}
                    onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                    className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                )
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                >
                  {selectedAddress ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={() => setShowFormModal(false)}
                  type="button"
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-black p-8 rounded-md shadow-md max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Are you sure you want to delete this address?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteAddress}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingAddress;
