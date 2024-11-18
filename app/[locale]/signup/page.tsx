'use client'
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, Phone, MapPin } from 'lucide-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { Category, fetchCategories } from '@/app/store/features/categorySlice';
import { useLocale, useTranslations } from 'next-intl';
// Form validation schema with Yup
const signupSchema = yup.object().shape({
    role: yup.string().required('Please select a role'),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number'),
    password_confirmation: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], "Passwords don't match"),
    languages: yup.array()
        .of(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required()
            })
        )
        .nullable()
        .when('role', {
            is: 'professor',
            then: (schema) => schema.min(1, 'Select at least one language')
        }),
    phone: yup.string().required('Phone number is required'),
    city: yup.string().required('City is required'),
    categories: yup.array()
        .of(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required()
            })
        )
        .nullable()
        .when('role', {
            is: 'professor',
            then: (schema) => schema.min(1, 'Select at least one category')
        }),
    description: yup.string()
        .when('role', {
            is: 'professor',
            then: (schema) =>
                schema.required('Description is required for professors')
                    .min(20, 'Description must be at least 20 characters')
        })
});

// TypeScript type for form data based on Yup schema
type FormData = yup.InferType<typeof signupSchema>;

// Custom styles for React Select
const selectStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        minHeight: '36px',
        fontSize: '0.875rem',
        borderColor: state.isFocused ? '#8B5CF6' : '#E5E7EB',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none',
        '&:hover': {
            borderColor: '#8B5CF6'
        }
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        padding: '0 8px',
    }),
    input: (provided: any) => ({
        ...provided,
        margin: '0',
        padding: '0',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        fontSize: '0.875rem',
    }),
    option: (provided: any) => ({
        ...provided,
        fontSize: '0.875rem',
        padding: '6px 12px',
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: '#EDE9FE',
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        fontSize: '0.75rem',
        padding: '2px 4px',
        color: '#5B21B6',
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        padding: '0 4px',
        color: '#5B21B6',
        '&:hover': {
            backgroundColor: '#DDD6FE',
            color: '#4C1D95',
        },
    }),
};

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isProfessor, setIsProfessor] = useState(false)
    const t = useTranslations('signup');
    const locale = useLocale();

    const { categories } = useAppSelector((state) => state.category);

    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
    } = useForm<FormData>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            role: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '',
            city: '',
            languages: [],
            categories: [],
            description: ''
        },
        mode: 'onTouched'
    });

    // Define select options
    const languageOptions = [
        'English', 'French', 'Spanish', 'German', 'Italian',
        'Chinese', 'Japanese', 'Arabic', 'Russian', 'Portuguese'
    ].map(lang => ({ label: lang, value: lang.toLowerCase() }));

    const categoryOptions = categories.map((category: Category) => ({
        label: category.name,
        value: category.id
    }));

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Form Section */}
            <div className="flex-1 bg-white">
                <ScrollArea className="h-screen">
                    <div className="flex items-center justify-center h-screen p-4 ">
                        <div className="w-full max-w-[500px] space-y-4 py-6">
                            <div className="space-y-1 text-center">
                                <h1 className="text-2xl font-bold text-blue-600">
                                    {t('create_account')}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {t('join_community')}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-3">
                                    {/* Name & Email Fields */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                {t('full_name')}
                                            </label>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200`}
                                                        placeholder={t("enter_name")}
                                                    />
                                                )}
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                {t('email')}
                                            </label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                                        placeholder={t("enter_email")}
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password Fields */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                {t("password")}
                                            </label>
                                            <div className={`${locale === 'ar' ? 'text-right' : 'text-left'} relative`}>
                                                <Controller
                                                    name="password"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                                            placeholder={t("create_password")}
                                                        />
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className={`absolute text-gray-400 top-3 hover:text-gray-600 ${locale === 'ar' ? 'left-3' : 'right-3'}`}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                {t("confirm_password")}
                                            </label>
                                            <div className="relative">
                                                <Controller
                                                    name="password_confirmation"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full px-3 py-2 text-sm border rounded-lg  ${errors.password_confirmation ? 'border-red-500' : 'border-gray-200'
                                                                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                                                            placeholder={t("confirm_password_placeholder")}
                                                        />
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className={`absolute text-gray-400 top-3 hover:text-gray-600 ${locale === 'ar' ? 'left-3' : 'right-3'}`}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password_confirmation && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.password_confirmation.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Fields */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                {t("phone")}
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="tel"
                                                            className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full py-2 pr-3 text-sm border rounded-lg pl-9 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                                            placeholder={t("enter_phone")}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs font-medium text-gray-700">
                                                {t("city")}
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full py-2 pr-3 text-sm border rounded-lg pl-9 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                                            placeholder={t("enter_city")}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Role Selection */}
                                    <div className="space-y-2">
                                        <div className="flex justify-center gap-4">
                                            <Controller
                                                name="role"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                value="professor"
                                                                checked={field.value === 'professor'}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value)
                                                                    setIsProfessor(true)
                                                                }}
                                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                            />
                                                            <span className="text-sm text-gray-700">{t("role.professor")}</span>
                                                        </label>
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                value="student"
                                                                checked={field.value === 'student'}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value)
                                                                    setIsProfessor(false)
                                                                }}
                                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                            />
                                                            <span className="text-sm text-gray-700">{t("role.student")}</span>
                                                        </label>
                                                    </>
                                                )}
                                            />
                                        </div>
                                        {errors.role && (
                                            <p className="text-xs text-red-500">{errors.role.message}</p>
                                        )}
                                    </div>

                                    {/* Professor-specific Fields */}
                                    {isProfessor && (
                                        <>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                                        {t("professor_fields.languages")}
                                                    </label>
                                                    <Controller
                                                        name="languages"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={languageOptions}
                                                                styles={selectStyles}
                                                                className="text-sm"
                                                                value={languageOptions.filter(option =>
                                                                    field.value?.some((val: any) => val.value === option.value)
                                                                )}
                                                                onChange={(selectedOptions) => {
                                                                    field.onChange(selectedOptions || []);
                                                                }}
                                                                placeholder={t("professor_fields.select_languages")}
                                                            />
                                                        )}
                                                    />
                                                    {errors.languages && (
                                                        <p className="text-xs text-red-500">{errors.languages.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                                        {t("professor_fields.categories")}
                                                    </label>
                                                    <Controller
                                                        name="categories"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={categoryOptions}
                                                                value={categoryOptions.filter(option =>
                                                                    field.value?.some((val: any) => val.value === option.value)
                                                                )}
                                                                onChange={(selectedOptions) => {
                                                                    field.onChange(selectedOptions || []);
                                                                }}
                                                                styles={selectStyles}
                                                                className="text-sm"
                                                                placeholder={t("professor_fields.select_categories")}
                                                            />
                                                        )}
                                                    />
                                                    {errors.categories && (
                                                        <p className="text-xs text-red-500">{errors.categories.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                                        {t("professor_fields.description")}
                                                    </label>
                                                    <Controller
                                                        name="description"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <textarea
                                                                {...field}
                                                                rows={3}
                                                                className={`${locale === 'ar' ? 'text-right' : 'text-left'} w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                                                                placeholder={t("professor_fields.description_placeholder")}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isDirty || !isValid}
                                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-white transition-all bg-blue-700 rounded-lg hover:bg-blue-800"
                                >
                                    {t("button.create")}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Image Section */}
            <div className="hidden w-1/2 bg-blue-100 lg:block">
                <img
                    src="/img/hero01.jpg"
                    alt="Sign up"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default SignupForm;