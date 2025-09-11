// "use client"; // This component needs client-side interactivity for forms and state

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { UploadCloud } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { AddProductFormValues, AddProductSchema } from "@/lib/schemas";

// interface AddProductDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function AddProductDialog({
//   open,
//   onOpenChange,
// }: AddProductDialogProps) {
//   // Initialize react-hook-form with Zod resolver for validation
//   const form = useForm<AddProductFormValues>({
//     resolver: zodResolver(AddProductSchema),
//     defaultValues: {
//       serialNumber: "",
//       name: "",
//       category: "",
//       quantity: "",
//       buyingPrice: "",
//       image: "",
//     },
//   });

//   // Handles form submission
//   const onSubmit = (values: AddProductFormValues) => {
//     console.log("New Product Data:", values);
//     // In a real application, you would send this data to your backend
//     // e.g., using a Server Action or an API route:
//     // await addProduct(values);
//     // After successful submission, reset the form and close the dialog
//     form.reset();
//     onOpenChange(false);
//   };

//   // Predefined categories for the dropdown
//   const categories = [
//     "Electronics",
//     "Accessories",
//     "Office Supplies",
//     "Furniture",
//     "Storage",
//     "Apparel",
//     "Books",
//     "Home Goods",
//   ];

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New Product</DialogTitle>
//           <DialogDescription>
//             Fill in the details for the new product. Click save when you&apos;re
//             done.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="grid gap-4 py-4"
//           >
//             {/* Product Serial Number Field */}
//             <FormField
//               control={form.control}
//               name="serialNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Serial Number</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., ABC-123" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Product Name Field */}
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Super Widget" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Category Dropdown */}
//             <FormField
//               control={form.control}
//               name="category"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category} value={category}>
//                           {category}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Quantity Field */}
//             <FormField
//               control={form.control}
//               name="quantity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Quantity</FormLabel>
//                   <FormControl>
//                     {/* Use valueAsNumber for correct type handling with number inputs */}
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Buying Price Field */}
//             <FormField
//               control={form.control}
//               name="buyingPrice"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Buying Price</FormLabel>
//                   <FormControl>
//                     {/* Use step="0.01" for currency and valueAsNumber */}
//                     <Input
//                       type="number"
//                       step="0.01"
//                       {...field}
//                       onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Product Image Upload/URL Field */}
//             <FormField
//               control={form.control}
//               name="image"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Image URL</FormLabel>
//                   <FormControl>
//                     <div className="flex items-center gap-2">
//                       <Input
//                         placeholder="e.g., https://example.com/image.jpg"
//                         {...field}
//                       />
//                       <Button type="button" variant="outline" size="icon">
//                         <UploadCloud className="w-4 h-4" />
//                         <span className="sr-only">Upload Image</span>
//                       </Button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter>
//               <Button type="submit">Save Product</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
