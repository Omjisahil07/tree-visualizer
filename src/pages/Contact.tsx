
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

// Define validation schema using Zod
const feedbackSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function Contact() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form on input change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [feedbackForm, touched]);

  const validateForm = () => {
    try {
      feedbackSchema.parse(feedbackForm);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFeedbackForm({
      ...feedbackForm,
      [name]: value,
    });
    
    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    const allTouched = Object.keys(feedbackForm).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    // Validate before submission
    const isValid = validateForm();
    if (!isValid) {
      toast({
        title: "Form Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Step 1: Store feedback in Supabase
      console.log("Submitting feedback to database:", feedbackForm);
      const { error: dbError } = await supabase
        .from('feedback')
        .insert([
          {
            name: feedbackForm.name,
            email: feedbackForm.email,
            subject: feedbackForm.subject,
            message: feedbackForm.message
          }
        ] as any); // Using type assertion as a workaround for the type issue
      
      if (dbError) {
        console.error("Database error:", dbError);
        throw dbError;
      }
      
      console.log("Feedback stored in database successfully");
      
      // Step 2: Send email notification
      console.log("Invoking send-feedback-email function");
      const { error: emailError, data: emailData } = await supabase.functions.invoke('send-feedback-email', {
        body: feedbackForm
      });
      
      console.log("Email function response:", emailData);
      
      if (emailError) {
        console.error("Email sending error:", emailError);
        // Continue even if email fails, we already saved to DB
      }
      
      toast({
        title: "Feedback Sent",
        description: "Thank you for your feedback. We appreciate your input!",
      });
      
      // Reset form
      setFeedbackForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Send Your Feedback</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us improve our data structure visualizer by sharing your thoughts and suggestions.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Feedback</CardTitle>
            <CardDescription>
              We value your input to improve our visualizer and make it better for everyone.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleFeedbackSubmit} noValidate>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback-name">Name</Label>
                  <Input 
                    id="feedback-name"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleFeedbackChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && touched.name && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback-email">Email</Label>
                  <Input 
                    id="feedback-email"
                    name="email"
                    type="email"
                    value={feedbackForm.email}
                    onChange={handleFeedbackChange}
                    onBlur={handleBlur}
                    placeholder="Your email address"
                    required
                    disabled={isSubmitting}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && touched.email && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-subject">Subject</Label>
                <Input 
                  id="feedback-subject"
                  name="subject"
                  value={feedbackForm.subject}
                  onChange={handleFeedbackChange}
                  onBlur={handleBlur}
                  placeholder="What's your feedback about?"
                  required
                  disabled={isSubmitting}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && touched.subject && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" /> {errors.subject}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-message">Feedback</Label>
                <Textarea 
                  id="feedback-message"
                  name="message"
                  value={feedbackForm.message}
                  onChange={handleFeedbackChange}
                  onBlur={handleBlur}
                  placeholder="Your feedback"
                  rows={5}
                  required
                  disabled={isSubmitting}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && touched.message && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
