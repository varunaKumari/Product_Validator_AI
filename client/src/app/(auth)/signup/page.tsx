'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Simulate registration flow
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg('Failed to create account. Email may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-background relative px-6">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md glass p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Product Validator AI
            </span>
          </Link>
          <h2 className="text-2xl font-bold">Create account</h2>
          <p className="text-sm text-muted-foreground mt-1">Get 5 free credits to start validating ideas</p>
        </div>

        {errorMsg && (
          <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-xl p-3.5 mb-6">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="John Doe"
              className="w-full bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-foreground"
            />
            {errors.name && (
              <span className="text-xs text-destructive mt-1.5 block">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className="w-full bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-foreground"
            />
            {errors.email && (
              <span className="text-xs text-destructive mt-1.5 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              className="w-full bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-foreground"
            />
            {errors.password && (
              <span className="text-xs text-destructive mt-1.5 block">{errors.password.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="••••••••"
              className="w-full bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-foreground"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-destructive mt-1.5 block">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-primary/25 cursor-pointer mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
