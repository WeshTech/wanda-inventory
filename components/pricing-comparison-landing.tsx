// import React from "react";

// const PricingComparison = () => {
//   return (
//     <Table className="w-full">
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-1/5 text-left font-semibold text-xs">
//             Features
//           </TableHead>
//           <TableHead className="text-center font-semibold text-xs">
//             Basic
//           </TableHead>
//           <TableHead className="text-center font-semibold bg-primary/5 text-xs">
//             Professional
//             <Badge className="ml-2 text-xs">Popular</Badge>
//           </TableHead>
//           <TableHead className="text-center font-semibold text-xs">
//             Advanced
//           </TableHead>
//           <TableHead className="text-center font-semibold text-xs">
//             Enterprise
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {/* Product & Inventory Management */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Package className="w-4 h-4 inline mr-2" />
//             Product & Inventory Management
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Product Catalog Size
//           </TableCell>
//           <TableCell className="text-center text-xs">Up to 500</TableCell>
//           <TableCell className="text-center bg-primary/5 text-xs">
//             Up to 900
//           </TableCell>
//           <TableCell className="text-center text-xs">Up to 1,200</TableCell>
//           <TableCell className="text-center text-xs">Unlimited</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Basic Inventory Tracking
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Advanced Inventory Tracking
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Enterprise Inventory Management
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Warehouse Automation
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>

//         {/* Scanning & Data Capture */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Smartphone className="w-4 h-4 inline mr-2" />
//             Scanning & Data Capture
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Barcode Scanning
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             RFID Support
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>

//         {/* Locations & Access */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Globe className="w-4 h-4 inline mr-2" />
//             Locations & Access
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Warehouse Locations
//           </TableCell>
//           <TableCell className="text-center text-xs">1 Location</TableCell>
//           <TableCell className="text-center bg-primary/5 text-xs">
//             4 Locations
//           </TableCell>
//           <TableCell className="text-center text-xs">10 Locations</TableCell>
//           <TableCell className="text-center text-xs">Unlimited</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             User Accounts
//           </TableCell>
//           <TableCell className="text-center text-xs">1 User</TableCell>
//           <TableCell className="text-center bg-primary/5 text-xs">
//             5 Users
//           </TableCell>
//           <TableCell className="text-center text-xs">11 Users</TableCell>
//           <TableCell className="text-center text-xs">Unlimited</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             User Roles
//           </TableCell>
//           <TableCell className="text-center text-xs">1 Role</TableCell>
//           <TableCell className="text-center bg-primary/5 text-xs">
//             5 Roles
//           </TableCell>
//           <TableCell className="text-center text-xs">11 Roles</TableCell>
//           <TableCell className="text-center text-xs">Unlimited</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Database className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             SKU Access
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Access Log Auditing
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>

//         {/* Reports & Analytics */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Database className="w-4 h-4 inline mr-2" />
//             Reports & Analytics
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Database className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Basic Reports
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Advanced Analytics
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Database className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Custom Reports & Dashboards
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>

//         {/* Integrations */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Zap className="w-4 h-4 inline mr-2" />
//             Integrations & API
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             API Access
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <CreditCard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             ETIMS (KRA) Integration
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Banknote className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Bank Integration
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <CreditCard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             M-Pesa Till Integration
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Custom Integrations
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>

//         {/* Network & Security */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Shield className="w-4 h-4 inline mr-2" />
//             Network & Security
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Network className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             IP Address Management
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Custom Pricing Rules
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>

//         {/* Support */}
//         <TableRow className="bg-muted/30">
//           <TableCell
//             colSpan={5}
//             className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
//           >
//             <Headphones className="w-4 h-4 inline mr-2" />
//             Support & Training
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Headphones className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Support Level
//           </TableCell>
//           <TableCell className="text-center text-xs">Email Support</TableCell>
//           <TableCell className="text-center bg-primary/5 text-xs">
//             Email & Chat
//           </TableCell>
//           <TableCell className="text-center text-xs">Email & Chat</TableCell>
//           <TableCell className="text-center text-xs">
//             24/7 Phone & Chat
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Account Manager
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center bg-primary/5">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <X className="w-5 h-5 text-gray-400 mx-auto" />
//           </TableCell>
//           <TableCell className="text-center">
//             <Check className="w-5 h-5 text-green-600 mx-auto" />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell className="flex items-center gap-2 text-xs">
//             <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//             Onboarding Training
//           </TableCell>
//           <TableCell className="text-center text-xs">Self-service</TableCell>
//           <TableCell className="text-center bg-primary/5 text-xs">
//             Guided Setup
//           </TableCell>
//           <TableCell className="text-center text-xs">Guided Setup</TableCell>
//           <TableCell className="text-center text-xs">Full Training</TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// };

// export default PricingComparison;
