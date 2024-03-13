import { render, screen } from "@testing-library/react-native"
import EmptyContainer from "../../../src/globals/EmptyContainer"

describe("Empty Container ...",()=>{
    beforeAll(()=>{
        render(<EmptyContainer/>)
    })

    it("It will render the empty component successfull",()=>{
        const parent_view = screen.getByTestId("container_empty")
        expect(parent_view).toBeDefined()
    })
})