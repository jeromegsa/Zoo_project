// "use client"

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { PawPrint, User, Building, Eye, EyeOff } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// const formSchema = z.object({
//   username: z.string().min(3, {
//     message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
//   }),
//   nom: z.string().min(2, {
//     message: "Le nom doit contenir au moins 2 caractères.",
//   }),
//   prenom: z.string().min(2, {
//     message: "Le prénom doit contenir au moins 2 caractères.",
//   }),
//   email: z.string().email({
//     message: "Veuillez entrer une adresse email valide.",
//   }),
//   password: z.string().min(8, {
//     message: "Le mot de passe doit contenir au moins 8 caractères.",
//   }),
//   localisation: z.string().min(2, {
//     message: "Veuillez entrer une localisation valide.",
//   }),
//   role: z.enum(["eleveur", "user", "refuge"], {
//     required_error: "Veuillez sélectionner un rôle.",
//   }),
// })

// export default function SignupForm() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       nom: "",
//       prenom: "",
//       email: "",
//       password: "",
//       localisation: "",
//       role: "user",
//     },
//   })

//   function onSubmit(values) {
//     setIsLoading(true)
//     // Simuler un appel API
//     console.log(values)
//     setTimeout(() => {
//       setIsLoading(false)
//       // Redirection ou notification de succès
//     }, 1500)
//   }

//   return (
//     <Card className="w-full max-w-md border-none shadow-lg">
//       <CardHeader className="space-y-1">
//         <div className="flex items-center justify-center mb-2">
//           <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
//             <PawPrint className="h-6 w-6 text-rose-600" />
//           </div>
//         </div>
//         <CardTitle className="text-2xl font-bold text-center">Créez votre compte</CardTitle>
//         <CardDescription className="text-center">Rejoignez notre communauté d'amoureux des animaux</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="prenom"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Prénom</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Jean" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="nom"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nom</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Dupont" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nom d'utilisateur</FormLabel>
//                   <FormControl>
//                     <Input placeholder="jean_dupont" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="jean.dupont@exemple.fr" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Mot de passe</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         <span className="sr-only">
//                           {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
//                         </span>
//                       </Button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="localisation"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Localisation</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Paris, France" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="role"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Vous êtes</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="grid grid-cols-3 gap-4"
//                     >
//                       <FormItem>
//                         <FormLabel className="[&:has([data-state=checked])>div]:border-rose-600 [&:has([data-state=checked])>div]:bg-rose-50">
//                           <FormControl>
//                             <RadioGroupItem value="user" className="sr-only" />
//                           </FormControl>
//                           <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer">
//                             <User className="mb-3 h-6 w-6 text-rose-600" />
//                             <span className="text-center text-sm font-medium leading-none">Utilisateur</span>
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                       <FormItem>
//                         <FormLabel className="[&:has([data-state=checked])>div]:border-rose-600 [&:has([data-state=checked])>div]:bg-rose-50">
//                           <FormControl>
//                             <RadioGroupItem value="eleveur" className="sr-only" />
//                           </FormControl>
//                           <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer">
//                             <PawPrint className="mb-3 h-6 w-6 text-rose-600" />
//                             <span className="text-center text-sm font-medium leading-none">Éleveur</span>
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                       <FormItem>
//                         <FormLabel className="[&:has([data-state=checked])>div]:border-rose-600 [&:has([data-state=checked])>div]:bg-rose-50">
//                           <FormControl>
//                             <RadioGroupItem value="refuge" className="sr-only" />
//                           </FormControl>
//                           <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer">
//                             <Building className="mb-3 h-6 w-6 text-rose-600" />
//                             <span className="text-center text-sm font-medium leading-none">Refuge</span>
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
//               {isLoading ? "Création en cours..." : "Créer mon compte"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//       <CardFooter className="flex justify-center">
//         <p className="text-sm text-muted-foreground">
//           Vous avez déjà un compte?{" "}
//           <a href="#" className="text-rose-600 hover:underline">
//             Connectez-vous
//           </a>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }
