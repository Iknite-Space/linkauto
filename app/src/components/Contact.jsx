import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMailUnread, IoIosMailOpen } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactDetails = [
  {
    icon: <FaLocationDot className="text-primary text-lg mt-1" />,
    label: "Address",
    content: (
      <>
        Check-Point, Molyko
        <br />
        Buea, Cameroon
      </>
    ),
  },
  {
    icon: <IoMdMailUnread className="text-red-500 text-lg mt-1" />,
    label: "Email",
    content: "contact@linkauto.xyz",
  },
  {
    icon: <FaPhoneAlt className="text-accent text-lg mt-1" />,
    label: "Phone",
    content: "+237 6XX XXX XXX",
  },
];

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    alert("Message sent!");
  };

  return (
    <section className="w-full px-4 py-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full rounded-lg p-8 bg-white">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-lg p-6 border-gray-300"
        >
          <h1 className="font-bold font-sans text-5xl text-black mb-2">
            Need additional information?
          </h1>
          <p className="text-gray-600 mb-6">
            If you have any questions or need further assistance, feel free to
            reach out to us.
          </p>

          <div className="space-y-5 text-gray-700">
            {contactDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex gap-3 items-start"
              >
                {item.icon}
                <div>
                  <strong className="block">{item.label}:</strong>
                  <span>{item.content}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-5 w-full max-w-lg"
        >
          <div>
            <label className="block text-md font-medium text-gray-700">
              Full Name
            </label>
            <input
              placeholder="e.g. John Doe"
              type="text"
              {...register("name")}
              className="w-full mt-1 px-5 py-4 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100"
            />
            {errors.name && (
              <p className="text-sm text-red mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              Email Address
            </label>
            <input
              placeholder="e.g. mail@example.com"
              type="email"
              {...register("email")}
              className="w-full mt-1 px-5 py-4 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100"
            />
            {errors.email && (
              <p className="text-sm text-red mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">
              Message
            </label>
            <textarea
              placeholder="Type your message here..."
              rows="5"
              {...register("message")}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100"
            />
            {errors.message && (
              <p className="text-sm text-red mt-1">{errors.message.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 font-sans font-bold bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition-colors"
          >
            {!isSubmitting && <IoIosMailOpen className="text-lg" />}
            {isSubmitting ? "Sending..." : " Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
