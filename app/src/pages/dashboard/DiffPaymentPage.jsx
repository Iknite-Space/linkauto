import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Button from "../../components/UI/Button";

const paymentOptions = [
  {
    name: "Mobile Money",
    image: "./../assets/mobilemoney.png",
    fields: [
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
      { name: "amount", label: "Amount", type: "number", placeholder: "Enter amount" },
      { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
    ],
    schema: z.object({
      phone: z.string().min(9, "Phone number must be at least 9 digits"),
      amount: z.number().positive("Amount must be greater than 0"),
      description: z.string().min(3, "Description is too short"),
    }),
  },
  {
    name: "Credit Card",
    image: "./../assets/visa2.png",
    fields: [
      { name: "cardNumber", label: "Card Number", type: "text", placeholder: "Enter card number" },
      { name: "expiryDate", label: "Expiry Date", type: "text", placeholder: "MM/YY" },
      { name: "cvv", label: "CVV", type: "password", placeholder: "Enter CVV" },
      { name: "amount", label: "Amount", type: "number", placeholder: "Enter amount" },
    ],
    schema: z.object({
      cardNumber: z.string().min(12, "Card number must be at least 12 digits"),
      expiryDate: z.string().min(4, "Enter a valid expiry date"),
      cvv: z.string().min(3, "CVV must be at least 3 digits"),
      amount: z.number().positive("Amount must be greater than 0"),
    }),
  },
  {
    name: "PayPal",
    image: "./../assets/paypal.png",
    fields: [
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
      { name: "amount", label: "Amount", type: "number", placeholder: "Enter amount" },
      { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
    ],
    schema: z.object({
      phone: z.string().min(9, "Phone number must be at least 9 digits"),
      amount: z.number().positive("Amount must be greater than 0"),
      description: z.string().min(3, "Description is too short"),
    }),
  },
  {
    name: "Bank Transfer",
    image: "./../assets/banktransfer.png",
    fields: [
      { name: "accountNumber", label: "Account Number", type: "text", placeholder: "Enter account number" },
      { name: "bankName", label: "Bank Name", type: "text", placeholder: "Enter bank name" },
      { name: "amount", label: "Amount", type: "number", placeholder: "Enter amount" },
    ],
    schema: z.object({
      accountNumber: z.string().min(6, "Account number too short"),
      bankName: z.string().min(2, "Bank name is too short"),
      amount: z.number().positive("Amount must be greater than 0"),
    }),
  },
];

const DiffPaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const form = useForm({
    resolver: selectedMethod ? zodResolver(selectedMethod.schema) : undefined,
    defaultValues: {},
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Payment submitted:", data);
    alert(`Payment for ${selectedMethod.name} submitted!`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <h2 className="text-3xl font-bold text-[#023b85] text-center mb-10 tracking-tight">
        Choose a Payment Method
      </h2>

      {/* Payment Methods */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {paymentOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelectedMethod(option)}
            className={`group cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white p-4 border ${
              selectedMethod?.name === option.name ? "border-[#023b85]" : "border-transparent"
            }`}
          >
            <div
              className="h-28 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${option.image})`,
              }}
            ></div>
            <p className="mt-3 text-center text-lg font-semibold text-gray-700 group-hover:text-[#023b85]">
              {option.name}
            </p>
          </div>
        ))}
      </div>

      {/* Dynamic Form */}
      {selectedMethod && (
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto border border-gray-100">
          <h3 className="text-2xl font-bold text-[#023b85] mb-6 text-center">
            Complete Your {selectedMethod.name} Payment
          </h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {selectedMethod.fields.map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...form.register(field.name, {
                    valueAsNumber: field.type === "number" ? true : undefined,
                  })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-[#023b85] focus:ring-2 focus:ring-[#023b85] outline-none transition"
                />
                {form.formState.errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors[field.name].message}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              variant="primary"
              className="w-full py-3 rounded-xl text-lg font-semibold transition-transform hover:scale-[1.02]"
            >
              Complete Payment
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiffPaymentPage;
