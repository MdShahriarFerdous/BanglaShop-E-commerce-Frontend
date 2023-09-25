import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { DeleteCategory, UpdateCategory } from "../../backend-API-services/api";

export const categoryAlert = async (
	categoryName,
	categoryId,
	loadCategories
) => {
	const updateResult = await Swal.fire({
		title: "Update Category",
		text: "Enter the new category name:",
		input: "text",
		inputValue: categoryName,
		showCloseButton: true,
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: "Update",
		denyButtonText: `Delete`,
		inputValidator: (value) => {
			if (!value) {
				return "You need to enter a new category name";
			}
		},
	});

	if (updateResult.isConfirmed) {
		const data = await UpdateCategory(updateResult.value, categoryId);
		if (data.error) {
			toast.error(data.error);
		} else {
			toast.success(`"${data?.updateData?.name}" is updated`);
			loadCategories();
		}
	} else if (updateResult.isDenied) {
		const data = await DeleteCategory(categoryId);
		if (data) {
			loadCategories();
			Swal.fire("Deleted!", "Your category has been deleted.", "success");
		}
	}
};
