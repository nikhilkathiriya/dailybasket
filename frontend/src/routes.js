import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./common/layout";
import { Cart, Checkout, EmailVerification, VerifyCode, ResetPassword, LandingPage, OrderConfirmation, ProductDetail, ProductListing, BestSellingProductListing, SignIn, SignUp, AboutUs, PrivacyPolicy } from "./container";
import Profile from "./container/profile/profile";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Layout><SignIn /></Layout>
    },
    {
        path: "/signup",
        element: <Layout><SignUp /></Layout>
    },
    {
        path: "/email-verification",
        element: <Layout><EmailVerification /></Layout>
    },
    {
        path: "/verify-code",
        element: <Layout><VerifyCode /></Layout>
    },
    {
        path: "/reset-password",
        element: <Layout><ResetPassword /></Layout>
    },
    {
        path: "/",
        element: <Layout><LandingPage /></Layout>
    },
    {
        path: "/category",
        element: <Layout><ProductListing /></Layout>
    },
    {
        path: "/best-selling",
        element: <Layout><BestSellingProductListing /></Layout>
    },
    {
        path: "/product",
        element: <Layout><ProductDetail /></Layout>
    },
    {
        path: "/cart",
        element: <Layout><Cart /></Layout>
    },
    {
        path: "/checkout",
        element: <Layout><Checkout /></Layout>
    },
    {
        path: "/order-detail",
        element: <Layout><OrderConfirmation /></Layout>
    },
    {
        path: "/profile",
        element: <Layout><Profile /></Layout>
    },
    {
        path: "/about-us",
        element: <Layout><AboutUs /></Layout>
    },
    {
        path: "/privacy-policy",
        element: <Layout><PrivacyPolicy /></Layout>
    },
    {
        path: "*",
        element: <Navigate to="/" replace />
    },

])

export default router;