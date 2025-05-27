import React, { useState } from 'react';
import { Package, Truck, Clock, MapPin, Eye, History, ShoppingBag } from 'lucide-react';
import { useGetActiveOrder } from '@/hooks/customer/useGetActiveOrder';
import { useGetCurrentUser } from '@/hooks/user/useGetCurrentUser';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrderPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'active' | 'history'>('active');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { data: currentUser, isPending: isFetchingCurrentUser, isError: errorFetchingCurrentUser } = useGetCurrentUser();
  const { data: activeOrder, isFetching: isFetchingOrders, isError: errorFetchingOrders } = useGetActiveOrder(currentUser?.currentUser.id ?? 0);

  console.log(activeOrder)
  console.log(currentUser)

  // Mock order data with placeholder images
  const allOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-05-20',
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          quantity: 1,
          price: 79.99,
          image: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=Headphones'
        },
        {
          id: '2',
          name: 'USB-C Cable',
          quantity: 2,
          price: 12.99,
          image: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=Cable'
        }
      ],
      total: 105.97,
      shippingAddress: '123 Main St, New York, NY 10001',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-05-25'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-05-22',
      status: 'delivering',
      items: [
        {
          id: '3',
          name: 'Smart Watch',
          quantity: 1,
          price: 199.99,
          image: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=Watch'
        }
      ],
      total: 199.99,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-05-28'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-05-25',
      status: 'preparing',
      items: [
        {
          id: '4',
          name: 'Laptop Stand',
          quantity: 1,
          price: 45.99,
          image: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=Stand'
        },
        {
          id: '5',
          name: 'Wireless Mouse',
          quantity: 1,
          price: 29.99,
          image: 'https://via.placeholder.com/100x100/EA580C/FFFFFF?text=Mouse'
        }
      ],
      total: 75.98,
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      estimatedDelivery: '2024-06-01'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-05-15',
      status: 'cancelled',
      items: [
        {
          id: '6',
          name: 'Gaming Keyboard',
          quantity: 1,
          price: 89.99,
          image: 'https://via.placeholder.com/100x100/EF4444/FFFFFF?text=Keyboard'
        }
      ],
      total: 89.99,
      shippingAddress: '321 Elm St, Miami, FL 33101',
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      date: '2024-05-26',
      status: 'delivering',
      items: [
        {
          id: '7',
          name: 'Phone Case',
          quantity: 2,
          price: 19.99,
          image: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=Case'
        },
        {
          id: '8',
          name: 'Screen Protector',
          quantity: 3,
          price: 9.99,
          image: 'https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=Screen'
        }
      ],
      total: 69.95,
      shippingAddress: '654 Maple Dr, Seattle, WA 98101',
      trackingNumber: 'TRK456789123',
      estimatedDelivery: '2024-05-30'
    }
  ];

  // Filter orders based on current page
  const activeOrders = allOrders.filter(order => order.status === 'preparing' || order.status === 'delivering');
  const historyOrders = allOrders.filter(order => order.status === 'delivered' || order.status === 'cancelled');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'delivering':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered':
        return <Package className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <Package className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'delivering':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {getStatusIcon(order.status)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{order.orderNumber}
              </h3>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <button
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover border-2 border-white"
              />
            ))}
            {order.items.length > 3 && (
              <div className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Truck className="w-4 h-4" />
            <span>Tracking: {order.trackingNumber}</span>
          </div>
        )}

        {order.estimatedDelivery && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {order.status === 'delivered' ? 'Delivered on' : 'Estimated delivery'}: {formatDate(order.estimatedDelivery)}
            </span>
          </div>
        )}
      </div>

      {/* Expanded Order Details */}
      {selectedOrder === order.id && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Items List */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h4>
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Delivery Address</p>
                      <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Tracking Number</p>
                        <p className="text-sm text-gray-600 font-mono">{order.trackingNumber}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ordersToShow = currentPage === 'active' ? activeOrders : historyOrders;

  if (isFetchingOrders || isFetchingCurrentUser) {
    return <div className="h-screen flex items-center">
      <h3 className="text-3xl">Loading...</h3>
    </div>
  }

  if (errorFetchingOrders || errorFetchingCurrentUser) {
    console.log("Something went wrong.")
  }

  return (
    <div className="min-h-screen py-8 pt-26">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Active Orders</h1>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => {
                setCurrentPage('active');
                setSelectedOrder(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'active'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Active Orders ({activeOrders.length})
            </button>
            <button
              onClick={() => {
                setCurrentPage('history');
                setSelectedOrder(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'history'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <History className="w-4 h-4" />
              Order History ({historyOrders.length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {ordersToShow.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Empty State */}
        {ordersToShow.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {currentPage === 'active' ? 'No active orders' : 'No order history'}
            </h3>
            <p className="text-gray-600">
              {currentPage === 'active'
                ? 'You have no orders being prepared or delivered.'
                : 'You have no completed or cancelled orders.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;