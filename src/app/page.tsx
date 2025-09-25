
import { CheckCircle, DollarSign, MessageSquare, Zap } from 'lucide-react';
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Ordermatic Relay
          </h1>
          <p className="text-xl text-gray-400">
            The smart display system for the Ordermatic ecosystem.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Vision</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center">
            To be the perfect connection point between the controlled chaos of the kitchen and the eager anticipation of the guest. This software is the digital handshake that closes that gap, transforming the signal of a freshly prepared order into a clear, calming notification for the customer.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
              <Zap className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Live Token Display</h3>
              <p className="text-gray-400">
                Real-time order status updates for customers.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Payments QR Display</h3>
              <p className="text-gray-400">
                A live, moderated display for QR payments.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
              <MessageSquare className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Customer Feedback Display</h3>
              <p className="text-gray-400">
                Showcase positive customer reviews in real-time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 py-4 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            Copyright &copy; {new Date().getFullYear()} Order Matic Technologies Private Limited. All rights reserved.
          </p>
          <a href="https://www.ordermatic.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            www.ordermatic.in
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
