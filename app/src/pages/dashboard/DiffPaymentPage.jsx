import {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Button from "../../components/UI/Button";

const paymentOptions = [
    {
        name: 'Campay',
        image: '',
        filds: [
          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number' },
          { name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter amount' },
          { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
        ],
      schema: z.object({
        phone: z.string().min(9, 'Phone number must be at least 9 digits'),
        amount: z.number().positive('Amount must be greater than 0'),
        description: z.string().min(3, 'Description is too short'),
      })
    },
    {
        name: 'Credit Card',
        image: '',
        field: [
          { name: 'cardNumber', label: 'Card Number', type: 'text', placeholder: 'Enter card number' },
          { name: 'expiryDate', label: 'Expiry Date', type: 'text', placeholder: 'MM/YY' },
          { name: 'cvv', label: 'CVV', type: 'password', placeholder: 'Enter CVV' },
          { name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter amount' },
        ],
      schema: z.object({
        cardNumber: z.string().min(12, 'Card number must be at least 12 digits'),
        expiryDate: z.string().min(4, 'Enter a valid expiry date'),
        cvv: z.string().min(3, 'CVV must be at least 3 digits'),
        amount: z.number().positive('Amount must be greater than 0'),
      })
    },
    {
        name: 'PayPal',
        image: '',
        field: [
          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number' },
          { name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter amount' },
          { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
        ],
      schema: z.object({
         phone: z.string().min(9, 'Phone number must be at least 9 digits'),
          amount: z.number().positive('Amount must be greater than 0'),
          description: z.string().min(3, 'Description is too short'),
      })
    },
    {
        name: 'Bank Transfer',
        image: '',
        field: [
          { name: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Enter account number' },
          { name: 'bankName', label: 'Bank Name', type: 'text', placeholder: 'Enter bank name' },
          { name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter amount' },
        ],
      schema: z.object({
        accountNumber: z.string().min(6, 'Account number too short'),
        bankName: z.string().min(2, 'Bank name is too short'),
        amount: z.number().positive('Amount must be greater than 0'),
      })
    }
];



const DiffPaymentPage = () => {
  const [selectedMethod, setSElectedMethod] = useState(null);

  // Validate form for any selectedOPtion
  const form = useForm({
    resolver: selectedMethod ? zodResolver(selectedMethod.schema) : undefined,
    defaultValues: {},
    mode: 'onChange',
  });

  // After validation passes, this function runs
  // data is an object containing all form values
  const onSubmit = (data) => {
    console.log('Payment submitted:', data);
    alert(`Payment for ${selectedMethod.name} submitted!`);
  };

  return (
    <div className="min-h-screen p-6 bg-primary">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">Choose a Payment Method</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"> 
          {paymentOptions.map((option, index) => (
            <a
                key={index}
                onClick={() => setSElectedMethod(option)}
                className="group relative block rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div
              className="h-48 bg-cover bg-center flex items-end justify-center"
              style={{
                backgroundImage: `url(${option.image})`
              }}>

                <div className="bg-primary w-full text-center py-4">
                  <p className="text-white text-xl font-semibold group-hover:text-accent transition-colors">{option.name}</p>
                </div>

              </div>
            </a>
          ))}
        </div>

{/* The dynamic form */}
{selectedMethod && (
        <div className="mt-10 bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Complete Your {selectedMethod.name} Payment
          </h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {selectedMethod.fields.map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...form.register(field.name, field.validation)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#01285b] focus:ring-[#01285b]"
                />
                {form.formState.errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors[field.name].message}
                  </p>
                )}
              </div>
            ))}

            <Button
            onClick={() => console.log("Clicked the button")}
            variant="primary"
            className="w-full">
              Complete Payment
            </Button>
          </form>
        </div>
      )}

    </div>

);
};


export default DiffPaymentPage;