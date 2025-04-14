function RoleSelector({ formData, handleChange }) {
    return (
      <div className="mt-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Rôle
        </label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">Utilisateur</option>
          <option value="refuge">Refuge</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
    );
  }
  
  export default RoleSelector;
  