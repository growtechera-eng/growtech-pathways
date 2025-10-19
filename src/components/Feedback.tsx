import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface FeedbackProps {
  onSubmit?: (data: FeedbackData) => void;
}

interface FeedbackData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export function Feedback({ onSubmit }: FeedbackProps) {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      mobile: '',
      message: ''
    };

    // Empty field validations
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    // Name validation
    else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Empty email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    // Email format validation
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Empty mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }
    // Mobile validation
    else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    // Empty message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    // Message validation
    else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Direct request to Google Apps Script using script ID from environment
   const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      });

      // With no-cors mode, we can't read the response
      // So we'll assume success if the request doesn't throw an error
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });
      onSubmit?.(formData);
      setAlertMessage({
        title: 'Thank you for your feedback!',
        description: `Thanks ${formData.name}, we've received your message and will get back to you soon at ${formData.email}.`
      });
      setShowSuccessAlert(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setAlertMessage({
        title: 'Something went wrong',
        description: 'We apologize, but we could not submit your feedback. Please try again later.'
      });
      setShowSuccessAlert(true);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
      // Only allow numbers
      const numbersOnly = value.replace(/[^0-9]/g, '');
      
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }));

      // Clear error when user is typing
      setErrors(prev => ({
        ...prev,
        [name]: numbersOnly.length > 10 ? 'Mobile number must be exactly 10 digits' : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Clear error when user is typing
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section className="w-full py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-purple-100">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Give us your feedback</h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full ${errors.mobile ? 'border-red-500' : ''}`}
                  maxLength={10}
                  aria-invalid={!!errors.mobile}
                  aria-describedby={errors.mobile ? "mobile-error" : undefined}
                />
                {errors.mobile && (
                  <p id="mobile-error" className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`w-full min-h-[120px] p-3 border rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Share your thoughts with us..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </form>
        </div>
      </div>

      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowSuccessAlert(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}